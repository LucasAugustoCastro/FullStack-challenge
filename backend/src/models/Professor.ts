import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Escolas from './Escola';
import Pessoa from './Pessoas';
import Turma from './Turma';

@Entity('Professores')
class Professor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Pessoa, pessoa => pessoa.professor, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_pessoa' })
  pessoa!: Pessoa;

  @Column()
  id_escola!: string;

  @ManyToOne(() => Escolas, escola => escola.professor, {eager: true, cascade: true})
  @JoinColumn({ name: 'id_escola'})
  escola!: Escolas;

  @Column()
  id_pessoa!: string;

  @OneToMany(() => Turma, turma => turma.professor)
  turma!: Professor;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;


}

export default Professor;