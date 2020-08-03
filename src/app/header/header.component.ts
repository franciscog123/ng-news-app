import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  
  searchForm=new FormGroup({
    inputBar: new FormControl('',[
      Validators.required
    ])
  });

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSearchSubmit() {
    this.router.navigate(['/search',this.searchForm.get('inputBar').value]);
    this.trigger.closeMenu();
  }

}
