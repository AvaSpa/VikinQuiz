using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace VikingQuiz.Api.Models
{
    public partial class VikinQuizContext : DbContext
    {
        public VikinQuizContext()
        {
        }

        public VikinQuizContext(DbContextOptions<VikinQuizContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Answer> Answer { get; set; }
        public virtual DbSet<Game> Game { get; set; }
        public virtual DbSet<Player> Player { get; set; }
        public virtual DbSet<PlayerGame> PlayerGame { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Quiz> Quiz { get; set; }
        public virtual DbSet<QuizQuestion> QuizQuestion { get; set; }
        public virtual DbSet<Sesion> Sesion { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.Text).HasMaxLength(250);

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.Answer)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK__Answer__Question__4D94879B");
            });

            modelBuilder.Entity<Game>(entity =>
            {
                entity.Property(e => e.GameDate).HasColumnType("date");

                entity.HasOne(d => d.Quiz)
                    .WithMany(p => p.Game)
                    .HasForeignKey(d => d.QuizId)
                    .HasConstraintName("FK__Game__QuizId__4222D4EF");
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.PictureUrl)
                    .IsRequired()
                    .HasColumnName("PictureURL")
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PlayerGame>(entity =>
            {
                entity.HasKey(e => new { e.Pid, e.Gid });

                entity.HasOne(d => d.G)
                    .WithMany(p => p.PlayerGame)
                    .HasForeignKey(d => d.Gid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerGame__Gid__47DBAE45");

                entity.HasOne(d => d.P)
                    .WithMany(p => p.PlayerGame)
                    .HasForeignKey(d => d.Pid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerGame__Pid__46E78A0C");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Quiz>(entity =>
            {
                entity.Property(e => e.PictureUrl)
                    .IsRequired()
                    .HasColumnName("PictureURL")
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Quiz)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Quiz__UserId__398D8EEE");
            });

            modelBuilder.Entity<QuizQuestion>(entity =>
            {
                entity.HasKey(e => new { e.QuizzId, e.QuestionId });

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuizQuestion)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__QuizQuest__Quest__3F466844");

                entity.HasOne(d => d.Quizz)
                    .WithMany(p => p.QuizQuestion)
                    .HasForeignKey(d => d.QuizzId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__QuizQuest__Quizz__3E52440B");
            });

            modelBuilder.Entity<Sesion>(entity =>
            {
                entity.Property(e => e.Token).IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Sesion)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Sesion__UserId__4AB81AF0");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.Pass).HasMaxLength(100);

                entity.Property(e => e.PictureUrl).HasColumnName("PictureURL");

                entity.Property(e => e.Username).HasMaxLength(100);
            });
        }
    }
}
