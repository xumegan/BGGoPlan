import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user:User;//must have Input
  constructor() { }

  ngOnInit() {}
  
}
