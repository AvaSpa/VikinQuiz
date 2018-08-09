using System.Collections.Generic;

namespace VikingQuiz.Api.ViewModels
{
    public class QuestionViewModel
    {

        public int Id { get; set; }
        
        public string Text { get; set; }
        public int CorrectAnswerId { get; set; }
        public List<AnswerViewModel> Answers { get; set; }
    }
}