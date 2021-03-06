﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Migrations
{
    [DbContext(typeof(VikinQuizContext))]
    [Migration("20180803115934_AddCode_To_Game")]
    partial class AddCode_To_Game
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("VikingQuiz.Api.Models.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("ID");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("date");

                    b.Property<int?>("QuestionId")
                        .HasColumnName("QuestionID");

                    b.Property<string>("Text")
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answer");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code");

                    b.Property<DateTime>("GameDate")
                        .HasColumnType("date");

                    b.Property<int?>("QuizId");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.ToTable("Game");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .HasMaxLength(50);

                    b.Property<string>("PictureUrl")
                        .IsRequired()
                        .HasColumnName("PictureURL")
                        .IsUnicode(false);

                    b.HasKey("Id");

                    b.ToTable("Player");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.PlayerGame", b =>
                {
                    b.Property<int>("Pid");

                    b.Property<int>("Gid");

                    b.Property<int>("Score");

                    b.HasKey("Pid", "Gid");

                    b.HasIndex("Gid");

                    b.ToTable("PlayerGame");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CorrectAnsId");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("date");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.Quiz", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("date");

                    b.Property<string>("PictureUrl")
                        .IsRequired()
                        .HasColumnName("PictureURL")
                        .IsUnicode(false);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Quiz");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.QuizQuestion", b =>
                {
                    b.Property<int>("QuizId");

                    b.Property<int>("QuestionId");

                    b.HasKey("QuizId", "QuestionId");

                    b.HasIndex("QuestionId");

                    b.ToTable("QuizQuestion");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .HasMaxLength(100);

                    b.Property<bool>("IsConfirmed");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("date");

                    b.Property<string>("Pass")
                        .HasMaxLength(100);

                    b.Property<string>("PictureUrl")
                        .HasColumnName("PictureURL");

                    b.Property<string>("Token")
                        .HasMaxLength(100);

                    b.Property<string>("Username")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasName("UQ__User__A9D10534AB60BBF2")
                        .HasFilter("[Email] IS NOT NULL");

                    b.ToTable("User");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.Answer", b =>
                {
                    b.HasOne("VikingQuiz.Api.Models.Question", "Question")
                        .WithMany("Answer")
                        .HasForeignKey("QuestionId")
                        .HasConstraintName("FK__Answer__Question__37A5467C");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.Game", b =>
                {
                    b.HasOne("VikingQuiz.Api.Models.Quiz", "Quiz")
                        .WithMany("Game")
                        .HasForeignKey("QuizId")
                        .HasConstraintName("FK__Game__QuizId__2F10007B");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.PlayerGame", b =>
                {
                    b.HasOne("VikingQuiz.Api.Models.Game", "G")
                        .WithMany("PlayerGame")
                        .HasForeignKey("Gid")
                        .HasConstraintName("FK__PlayerGame__Gid__34C8D9D1");

                    b.HasOne("VikingQuiz.Api.Models.Player", "P")
                        .WithMany("PlayerGame")
                        .HasForeignKey("Pid")
                        .HasConstraintName("FK__PlayerGame__Pid__33D4B598");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.Quiz", b =>
                {
                    b.HasOne("VikingQuiz.Api.Models.User", "User")
                        .WithMany("Quiz")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK__Quiz__UserId__267ABA7A");
                });

            modelBuilder.Entity("VikingQuiz.Api.Models.QuizQuestion", b =>
                {
                    b.HasOne("VikingQuiz.Api.Models.Question", "Question")
                        .WithMany("QuizQuestion")
                        .HasForeignKey("QuestionId")
                        .HasConstraintName("FK__QuizQuest__Quest__2C3393D0");

                    b.HasOne("VikingQuiz.Api.Models.Quiz", "Quiz")
                        .WithMany("QuizQuestion")
                        .HasForeignKey("QuizId")
                        .HasConstraintName("FK__QuizQuest__QuizI__2B3F6F97");
                });
#pragma warning restore 612, 618
        }
    }
}
