import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WordService } from '../word.service'
@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit {

  constructor(public formBuilderObj:FormBuilder,public wordServiceObj:WordService,public routerObj:Router,) { }

  addWordForm:FormGroup;


  ngOnInit(): void {
    this.addWordForm = this.formBuilderObj.group({
      word:['',Validators.required],
      meaning:['', Validators.required]
    })
  }

  get word(){
    return this.addWordForm.get("word")
  }

  get meaning(){
    return this.addWordForm.get("meaning")
  }

  onSubmit(){
    this.wordServiceObj.addWords(this.addWordForm.value).subscribe({
      next:(response)=>{
        if(response.message == "Word added to database"){
          this.routerObj.navigateByUrl("/home")
        }
        else{
          alert("Word Already exists in Database")
        }
      },
      error:(err)=>{console.log(err)}
    })
  }

}
