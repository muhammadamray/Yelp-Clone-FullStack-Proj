// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ReviewForm  from './ReviewForm';
import ReviewIndexItem from './ReviewIndexItem';
// import { getReviews, fetchReviews } from '../store/reviews';


const ReviewsIndex = ({reviews}) => {


    return (
        <>
            <ul>
                {reviews.map(review => {
                    return <ReviewIndexItem key={review.id} review={review} />
                })}
            </ul>
            {/* <ReviewForm /> */}
        </>
    );
};

export default ReviewsIndex;