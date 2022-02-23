import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dilogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {


  listatipo = ["Digital", "Midia Fisica"];
  FormatodoJogo!: FormGroup;
  editarBnt: string = 'Salvar';
  constructor(private formbilder: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editarJogo: any,
    private dialogref: MatDialogRef<DialogsComponent>,
  ) { }


  ngOnInit(): void {
    this.FormatodoJogo = this.formbilder.group({
      Nomejogo: ['', Validators.required],
      Genero: ['', Validators.required],
      Tipo: ['', Validators.required],
      Preco: ['', Validators.required],
      Descricao: ['', Validators.required],
      Data: ['', Validators.required],
    });

    if (this.editarJogo) {
      this.editarBnt = 'Editar';
      this.FormatodoJogo.controls['Nomejogo'].setValue(this.editarJogo.Nomejogo);
      this.FormatodoJogo.controls['Genero'].setValue(this.editarJogo.Genero);
      this.FormatodoJogo.controls['Tipo'].setValue(this.editarJogo.Tipo);
      this.FormatodoJogo.controls['Preco'].setValue(this.editarJogo.Preco);
      this.FormatodoJogo.controls['Descricao'].setValue(this.editarJogo.Descricao);
      this.FormatodoJogo.controls['Data'].setValue(this.editarJogo.Data);
    }

  }

  SalvarProduto() {
    if (!this.editarJogo) {
      if (this.FormatodoJogo.valid) {
        this.api.postjogo(this.FormatodoJogo.value)
          .subscribe({
            next: (res) => {
              alert('Jogo Adicionado com sucesso');
              this.FormatodoJogo.reset();
              this.dialogref.close('salvo');
            },
            error: () => {
              alert('erro ao tentar adicionar o jogo')
            }
          })
      }
    }else{
      this.atualizarJogo()
    }
  }

  atualizarJogo(){
    this.api.putjogo(this.FormatodoJogo.value, this.editarJogo.id)
    .subscribe({
      next: (res)=> {
        alert('Jogo Atualizado com Sucesso');
        this.FormatodoJogo.reset();
        this.dialogref.close('Atualizado')
      },
      error:() =>{
        alert('Nao foi possivel atualizar seu jogo')
      }
    })
  };



  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

}
