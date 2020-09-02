import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICellStructure } from '../interface';
@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Output() open = new EventEmitter<number[]>();
  @Input() cell: ICellStructure;
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.open.emit([this.cell.y, this.cell.x]);
  }

}
