import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { type: 'varchar', length: 255 } )
    name: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

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
