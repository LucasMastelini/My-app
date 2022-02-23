import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { DialogsComponent } from '../dialogs/dialogs.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss']
})
export class ItensComponent implements OnInit {

  displayedColumns: string[] = ['Nomejogo', 'Genero', 'Tipo', 'Preco', 'Data', 'Descricao', 'Acoes'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, public dialog: MatDialog) { }

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

  editarJogo(row: any){
    this.dialog.open(DialogsComponent, {
      width:'70%',
      data: row
    
    }).afterClosed().subscribe(val=>{
      if(val == 'Atualizado'){
        this.pegarjogos();
      }
    })
  }

  deletarJogo(id: number){
    this.api.deletejogo(id)
    .subscribe({
      next:(res)=>{
        alert('O jogo foi deletado')
        this.pegarjogos();this.pegarjogos();this.pegarjogos();
      },
      error:(err)=>{
        alert('Não foi possivel deletar este jogo')  
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}
