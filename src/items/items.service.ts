import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
  // private readonly items: Item[] = [
  //   {
  //     id: '3568465',
  //     name: 'Item One',
  //     qty: 100,
  //     description: 'This is item one',
  //   },
  //   {
  //     id: '6564644',
  //     name: 'Item Two',
  //     qty: 50,
  //     description: 'This is item two',
  //   },
  // ];

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }
  async create(item: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: CreateItemDto): Promise<Item> {
    return await this.itemModel.findById(id, item, { new: true });
    //new:true znamena ze pokud tam vubec neni, tak vytvori novy
  }
}
