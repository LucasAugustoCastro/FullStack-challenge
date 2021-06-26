import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Pessoa from './Pessoas';
import TurmaAluno from './TurmaAluno';

@Entity('Alunos')
class Aluno {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Pessoa, pessoa => pessoa.aluno, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_pessoa' })
  pessoa!: Pessoa;

  @Column()
  id_pessoa!: string;

  @Column()
  nome_responsavel!: string;

  @Column()
  telefone_responsavel!: string;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => TurmaAluno, turmaAluno => turmaAluno.aluno)
  turmaAluno!: TurmaAluno;


}

export default Aluno;