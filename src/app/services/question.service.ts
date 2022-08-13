import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  //get all question using quiz id
  public getQuestionsofQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //get all question for test
  public getQuestionsofQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //get single question by questionid
public getSingleQuestion(questionId:any){
  return this._http.get(`${baseUrl}/question/+${questionId}`)
}

  //add question
  public addQuestion(question:any){
  return this._http.post(`${baseUrl}/question/`,question)}

  //update question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question)
  }

  //delete question
  public deleteQuestion(questionId:any){
return this._http.delete(`${baseUrl}/question/${questionId}`)
  
  }

  //eval quiz
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz/`,questions);

  }
}
