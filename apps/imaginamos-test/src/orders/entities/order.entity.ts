import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Technic } from '../../technics/entities/technic.entity';
import { User } from '../../users/entities/user.entity';


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToOne(() => Technic, (technic) => technic.orders)
    technic: Technic;

    @Column( {type: 'varchar'} )
    type: string;

    @Column()
    tokenUuid: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updateAt: Date;
}
