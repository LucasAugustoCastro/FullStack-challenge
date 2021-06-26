import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Aluno from './Aluno';
import Turma from './Turma';


@Entity('Turma_Aluno')
class TurmaAluno {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Turma, turma => turma.turmaAluno, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_turma' })
  turma!: Turma;

  @Column()
  id_aluno!: string;

  @Column()
  id_turma!: string;

  @ManyToOne(() => Aluno, aluno => aluno.turmaAluno, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_aluno' })
  aluno!: Aluno;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;


}

export default TurmaAluno;