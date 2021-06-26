import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Diretor from './Diretor';
import Aluno from './Aluno';
import Professor from './Professor';
import Escolas from './Escola';

@Entity('Pessoas')
class Pessoas {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nome!: string;

  @Column()
  cpf!: string;

  @Column()
  telefone!: string;

  @Column()
  email!: string;

  @Column()
  password?: string;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Diretor, diretor => diretor.pessoa)
  diretor!: Diretor;

  @OneToMany(() => Aluno, aluno => aluno.pessoa)
  aluno!: Diretor;

  @OneToMany(() => Professor, professor => professor.pessoa)
  professor!: Diretor;

 

}

export default Pessoas;