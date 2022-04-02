import { Component, OnInit, TemplateRef } from '@angular/core';
import { WordService } from '../word.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.scss']
})
export class WordlistComponent implements OnInit {

  constructor(private router:Router,public wordservice:WordService,private formbuildObj:FormBuilder,private modalService:BsModalService) { }

  wordList:Array<any>;
  addWordForm:FormGroup;
  id:string;
  searchTerm;

  ngOnInit(): void {
    this.getWords();
  }

  getWords(){
    this.wordservice.getWords().subscribe({
      next:(response)=>{
        if(response.message == "Words in database"){
          this.wordList = response.payload
        }
      },
      error:(err)=>{console.log(err)}
    })
  }

  refreshWindow(){
    this.router.navigate(['path/home'])
    .then(() => { window.location.reload(); });
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  editWord(template,data){
    this.id = data._id
    this.openModal(template)
    this.addWordForm = this.formbuildObj.group({
      word:[data.word],
      meaning:[data.meaning]
    })
  }

  confirm():void{
    let obj = {
      word:this.addWordForm.value.word,
      meaning:this.addWordForm.value.meaning,
      _id:this.id
    }
    this.wordservice.editWords(obj).subscribe({
      next:(response)=>{
        if(response.message == "Word updated successfully"){
            alert("Word edited successfully")
            this.getWords();
            this.refreshWindow()
        }
      },
      error:(err)=>{console.log(err)}
    })
    this.modalRef?.hide();
  }

  deleteWord(id){
    this.wordservice.deleteWord(id).subscribe({
      next:(response)=>{
        if(response.message=="Word deleted successfully"){
          alert("Word deleted")
          this.refreshWindow()
        }
      },
      error:err=>console.log(err)
    })
  }
}
