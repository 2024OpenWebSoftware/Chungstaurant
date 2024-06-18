import { Timestamp } from 'firebase/firestore';

export interface Review {
    reviewId: number;
    rContent: string;
    restaurantId: number;
    userId: string;
    starRate: number;
    imgPath: string | null;
    timestamp: Timestamp;
}