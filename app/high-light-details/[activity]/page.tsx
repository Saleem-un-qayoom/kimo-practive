'use client'; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import './page.scss';
import Image from 'next/image';
import { HighLightsDetailsApi } from '@/API/API';
import { Activity } from '@/TS/Interfaces/activity.interface';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface PropType {
  params: {
    activity: string;
  };
}

interface initialStateType {
  activityData: Activity | null;
  activityDataLoading: boolean;
  activityDataNotFound: boolean;
}

const initialState: initialStateType = {
  activityData: null,
  activityDataLoading: true,
  activityDataNotFound: false,
};

function HighLightDetails({ params }: PropType) {
  const [
    { activityData, activityDataLoading, activityDataNotFound },
    setState,
  ] = useState(initialState);

  useEffect(() => {
    HighLightsDetailsApi(params.activity, (res, error) => {
      setState(prevData => ({
        ...prevData,
        activityData: error ? null : res.data,
        activityDataLoading: false,
        activityDataNotFound: error ? true : false,
      }));
    });
  }, []);

  return (
    <>
      <div className="flex justify-center hight-light-details-banner">
        {activityDataLoading ? (
          <SkeletonTheme baseColor="#aaa" highlightColor="#ccc">
            <Skeleton width={300} height={450}></Skeleton>
          </SkeletonTheme>
        ) : (
          <Image
            src={activityData?.image}
            width={300}
            height={450}
            alt="NO IMAGE"
            className="object-cover mx-auto"
          />
        )}
      </div>

      <div className="bg-[#e6f2f2] px-[10px] py-[80px]">
        {!activityDataLoading && !activityData ? (
          <div>
            <h1 className="text-4xl text-center text-red-600">
              No Activity Found !
            </h1>
          </div>
        ) : (
          <>
            <div className="wrapper">
              {activityDataLoading ? (
                <SkeletonTheme baseColor="#aaa" highlightColor="#ccc">
                  <Skeleton width={100} height={20} className="mb-5"></Skeleton>
                  <Skeleton count={5} className="w-full mb-2"></Skeleton>
                </SkeletonTheme>
              ) : (
                <>
                  <h2 className="mb-5 font-semibold">Description</h2>
                  <p className="mb-4">{activityData?.description}</p>
                </>
              )}
            </div>
            <div className="wrapper ">
              {activityDataLoading ? (
                <SkeletonTheme baseColor="#aaa" highlightColor="#ccc">
                  <Skeleton width={100} height={20} className="mb-5"></Skeleton>
                  <Skeleton
                    count={4}
                    className="mb-4"
                    width="100%"
                    height={64}
                  />
                </SkeletonTheme>
              ) : (
                <>
                  <h2 className="mb-5 font-semibold">Activities</h2>
                  {activityData?.activities.map(({ name }, index) => (
                    <div
                      key={index}
                      className="flex px-5 py-5 mb-3 bg-white rounded-lg"
                    >
                      {name}
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HighLightDetails;
