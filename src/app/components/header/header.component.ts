import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogsComponent } from '../dialogs/dialogs.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  displayedColumns: string[] = ['Nomejogo', 'Genero', 'Tipo', 'Preco', 'Data', 'Descricao', 'Acoes'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.pegarjogos();
  }

  pegarjogos(){
    this.api.getjogo()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert('erro no fetch para pegar os jogos')
      }
      
    })
  }
 
   openDialog() {
    this.dialog.open(DialogsComponent, {
      width: '30%'
    })
    
    .afterClosed().subscribe(val =>{
      if(val == 'salvo'){
        this.pegarjogos()
      }
    })
  }
}
