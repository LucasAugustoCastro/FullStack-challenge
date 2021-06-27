import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Diretor from './Diretor';
import Escolas from './Escola';
import Professor from './Professor';
import TurmaAluno from './TurmaAluno';

@Entity('Turmas')
class Turma {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Professor, professor => professor, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_professor' })
  professor!: Professor;

  @Column()
  id_professor!: string|null;

  @ManyToOne(() => Escolas, escola => escola, { eager: true, cascade: true })
  @JoinColumn({ name: 'id_escola' })
  escola!: Escolas;

  @Column()
  id_escola!: string;

  @Column()
  nome!: string;

  @Column()
  hora_inicio!: string;

  @Column()
  hora_fim!: string;

  @CreateDateColumn()
  create_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => TurmaAluno, turmaAluno => turmaAluno.turma)
  turmaAluno!: TurmaAluno;

}

export default Turma;