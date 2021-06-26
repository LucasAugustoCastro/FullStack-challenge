import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Diretor from './Diretor';
import Turma from './Turma';

@Entity('Escolas')
class Escolas {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Diretor, diretor => diretor, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_diretor' })
  diretor!: Diretor;

  @Column()
  id_diretor!: string;

  @Column()
  nome!: string;


  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Turma, turma => turma.escola)
  turma!: Turma;



}

export default Escolas;