import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review) private readonly reviewModel: typeof Review,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(createReviewDto);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.findAll();
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewModel.findByPk(id);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    return review.update(updateReviewDto);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    await review.destroy();
  }
}
