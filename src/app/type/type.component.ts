import { Component, Input } from '@angular/core';
@Component({
  selector: 'type-comp',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
    @Input() type:string;
}
