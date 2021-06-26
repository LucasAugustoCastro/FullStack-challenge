import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Escolas from './Escola';
import Pessoa from './Pessoas';

@Entity('Diretores')
class Diretor {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Pessoa, pessoa => pessoa.diretor, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_pessoa' })
  pessoa!: Pessoa;

  @Column()
  id_pessoa!: string;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Escolas, escola => escola.diretor)
  escola!: Escolas;


}

export default Diretor;