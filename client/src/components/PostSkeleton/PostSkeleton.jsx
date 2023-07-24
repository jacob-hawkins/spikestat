import { Skeleton } from '@mui/material';
import React from 'react';
import './PostSkeleton.css';

function PostSkeleton() {
    return (
        <div className='loader'>
            <div className='loaderTop'>
                <div className='flex-align'>
                    <div className='profilePictureSkeleton'>
                        <Skeleton variant='circular' width={32} height={32} />
                    </div>

                    <div className='usernameSkeleton'>
                        <Skeleton variant='rectangle' width={150} height={28} />
                    </div>
                </div>

                <Skeleton
                    variant='rectangle'
                    width={650}
                    height={150}
                    sx={{ marginLeft: '20px' }}
                />
            </div>

            <div className='loaderBottom flex-align'>
                <Skeleton variant='circular' width={50} height={50} />
                <Skeleton variant='rectangle' width={550} height={40} sx={{ marginLeft: '20px' }} />
            </div>
        </div>
    );
}

export default PostSkeleton;
