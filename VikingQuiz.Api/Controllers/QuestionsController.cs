using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Utilities;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuestionsController : Controller
    {
        private readonly QuestionRepository questionRepository;
        private readonly AnswerRepository answerRepository;
        private IEntityMapper<Question, QuestionViewModel> entityToVmMapper;
        private IEntityMapper<QuestionViewModel, Question> vmToEntityMapper;
        private IEntityMapper<Answer, AnswerViewModel> answerToVmMapper;
        private IEntityMapper<AnswerViewModel, Answer> vmToAnswerMapper;

        public QuestionsController(QuestionRepository questionRepository, AnswerRepository answerRepository, IEntityMapper<Question, QuestionViewModel> entityToVmMapper, IEntityMapper<QuestionViewModel, Question> vmToEntityMapper, IEntityMapper<Answer, AnswerViewModel> answerToVmMapper, IEntityMapper<AnswerViewModel, Answer> vmToAnswerMapper)
        {
            this.questionRepository = questionRepository;
            this.answerRepository = answerRepository;
            this.vmToEntityMapper = vmToEntityMapper;
            this.entityToVmMapper = entityToVmMapper;
            this.vmToAnswerMapper = vmToAnswerMapper;
            this.answerToVmMapper = answerToVmMapper;
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery(Name = "quiz")] int quizId)
        {
            var questions = questionRepository.GetAllByQuizId(quizId);
            var result = questions
                        .Select(question => addAnswersToQuestions(question))
                        .ToList();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreateQuestion([FromBody]QuestionViewModel questionVm, [FromQuery(Name = "quiz")] int quizId)
        {
            Question question = new Question
            {
                Text = questionVm.Text
            };

            Question newQuestion = questionRepository.AddQuestion(quizId, question);
            if (newQuestion == null)
            {
                return BadRequest("The text is already assigned to another question");
            }

            List<AnswerViewModel> realAnswers = this.processListOfAnswers(ref questionVm, ref newQuestion, quizId);
            if (realAnswers == null)
            {
                return BadRequest("You can't have two duplicate answers");
            }
            newQuestion = this.questionRepository.UpdateQuestion(newQuestion);
            QuestionViewModel newQuestionVm = entityToVmMapper.Map(newQuestion);
            newQuestionVm.Answers = realAnswers;
            return Created($"/{newQuestionVm.Id}", newQuestionVm);
        }

        [HttpPut]
        public IActionResult UpdateQuestion([FromBody]QuestionViewModel questionVm, [FromQuery(Name = "quiz")] int quizId)
        {
            Question question = vmToEntityMapper.Map(questionVm);
            Question newQuestion = this.questionRepository.UpdateQuestion(question);
            if (newQuestion.Id == -1)
            {
                return BadRequest("This question already exists!");
            }
            QuestionViewModel newQuestionVm = entityToVmMapper.Map(newQuestion);
            questionVm.Answers.ForEach(answerVm =>
            {
                Answer answer = this.vmToAnswerMapper.Map(answerVm);
                Answer newAnswer = this.answerRepository.UpdateAnswer(answer, newQuestion.Id);
                AnswerViewModel newAnswerViewModel = answerToVmMapper.Map(newAnswer);
                newQuestionVm.Answers.Add(newAnswerViewModel);
            });

            return Accepted($"/{newQuestionVm.Id}", newQuestionVm);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQuestion(int id, [FromQuery(Name = "quiz")] int quizId)
        {
            questionRepository.DeleteQuestion(quizId, id);
            return Ok();
        }

        [HttpGet("{id}")]
        //[Authorize]
        public IActionResult GetQuestionById(int id)
        {
            Question question = questionRepository.getQuestionById(id);
            if (question == null)
            {
                return NotFound("Question doesn't exist");
            }

            QuestionViewModel questionVm = this.entityToVmMapper.Map(question);
            questionVm.Answers = this.answerRepository.GetAllAnswers(question.Id)
                                                .Select(answer => this.answerToVmMapper.Map(answer))
                                                .ToList();
            return Ok(questionVm);
        }

        private List<AnswerViewModel> processListOfAnswers(ref QuestionViewModel questionVm, ref Question question, int quizId)
        {
            List<AnswerViewModel> realAnswers = new List<AnswerViewModel>();

            for (int i = 0; i < questionVm.Answers.Count; i++)
            {
                AnswerViewModel answerVm = questionVm.Answers[i];
                Answer answer = new Answer
                {
                    Text = answerVm.Text,
                    QuestionId = question.Id
                };

                int oldId = answerVm.Id;

                Answer newAnswer = this.answerRepository.AddAnswer(answer);
                if (newAnswer == null)
                {
                    this.questionRepository.DeleteQuestion(quizId, question.Id);
                    return null;
                }

                AnswerViewModel newAnswerVM = this.answerToVmMapper.Map(newAnswer);
                realAnswers.Add(newAnswerVM);

                int newId = newAnswer.Id;

                if (questionVm.CorrectAnswerId == oldId)
                {
                    question.CorrectAnsId = newId;
                }
            }
            return realAnswers;
        }

        private QuestionViewModel addAnswersToQuestions(Question question)
        {
            QuestionViewModel questionVM = this.entityToVmMapper.Map(question);
            questionVM.Answers = this.answerRepository.GetAllAnswers(question.Id)
                                                .Select(answer => this.answerToVmMapper.Map(answer))
                                                .ToList();
            return questionVM;
        }
    }
}
