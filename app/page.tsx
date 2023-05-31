'use client'; // This is a client component 👈🏽
import Image from 'next/image';
import forwardRoundIcon from '@/public/svg/forward-round-icon.svg';
import forwardIcon from '@/public/svg/forward-icon.svg';
import userImage from '@/public/media/user-image.png';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { CategoryListApi, HighLightsListApi } from '@/API/API';
import { HighLightType } from '@/TS/Interfaces/highlight.interface.';
import { CategoryType } from '@/TS/Interfaces/category.interface';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Link from 'next/link';

interface initialStateType {
  hightLightsData: HighLightType[];
  hightLIghtsDataLoading: boolean;
  categoriesData: CategoryType[];
  categoriesDataLoading: boolean;
  selectedCategory: CategoryType | null;
}

const initialState: initialStateType = {
  hightLightsData: [],
  hightLIghtsDataLoading: true,
  categoriesData: [],
  categoriesDataLoading: true,
  selectedCategory: null,
};

export default function Home() {
  const [
    {
      hightLightsData,
      hightLIghtsDataLoading,
      categoriesData,
      categoriesDataLoading,
      selectedCategory,
    },
    setState,
  ] = useState(initialState);
  useEffect(() => {
    HighLightsListApi(res => {
      setState(prevData => ({
        ...prevData,
        hightLightsData: res.data,
        hightLIghtsDataLoading: false,
      }));
    });

    CategoryListApi(res => {
      setState(prevData => ({
        ...prevData,
        categoriesData: res.data,
        categoriesDataLoading: false,
      }));
    });
  }, []);

  return (
    <>
      {/* BANNER */}
      <div className="banner">
        <h1 className="main-heading md:text-[140px] sm:text-[70px]">
          Welcome <br /> to Hawaii
        </h1>
      </div>

      {/* HIGHLIGHTED SECTION */}
      <div className="wrapper highlights-section">
        <h2 className="mb-5 font-semibold">Highlights</h2>
        <div className="flex justify-between overflow-x-auto h-[375px]">
          {hightLIghtsDataLoading ? (
            <SkeletonTheme baseColor="#aaa" highlightColor="#ccc">
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  className={index !== 2 ? 'mr-4' : ''}
                  width={350}
                  height={340}
                  key={index}
                />
              ))}
            </SkeletonTheme>
          ) : (
            hightLightsData.map(({ image, title, description }, index) => (
              <Link href={`/high-light-details/${title}`} key={index}>
                <div className="min-w-[350px] w-[350px] h-[340px] shadow-xl rounded-lg overflow-hidden mx-2">
                  <Image src={image} width={350} height={170} alt="" />
                  <div className="h-[50%] p-5 capitalize">
                    <h3 className="text-[#008080] text-[24px] font-semibold">
                      {title}
                    </h3>
                    <p className="h-16">{description}</p>
                    <div className="flex justify-end">
                      <Image
                        src={forwardRoundIcon}
                        width={40}
                        height={40}
                        alt="forward"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* CATEGORIES & TRAVEL GUIDE */}
      <div className="justify-between categories_and_travel_guide-section">
        <div className="wrapper md:flex md:justify-between sm:block">
          <div className="md:w-[48%] sm:w-full sm:mb-10">
            <h2 className="mb-5 font-semibold">Categories</h2>
            {categoriesDataLoading ? (
              <SkeletonTheme baseColor="#aaa" highlightColor="#ccc">
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    className={index !== 4 ? 'mb-4' : ''}
                    width="100%"
                    height={64}
                    key={index}
                  />
                ))}
              </SkeletonTheme>
            ) : (
              categoriesData.map((category, index) => (
                <>
                  <div
                    onClick={() =>
                      setState(prevData => ({
                        ...prevData,
                        selectedCategory:
                          category === selectedCategory ? null : category,
                      }))
                    }
                    key={index}
                    className="flex justify-between px-5 py-5 mb-2 bg-white rounded-lg cursor-pointer"
                  >
                    <p>{category.name}</p>
                    <Image
                      src={forwardIcon}
                      width={16}
                      height={16}
                      alt=""
                      className={`transition-transform ${
                        selectedCategory === category ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                  {selectedCategory === category && (
                    <div className="px-5 py-5 mb-2 transition-transform bg-white rounded-lg">
                      {category.activities.map(({ title }, index) => (
                        <p key={index}>{title}</p>
                      ))}
                    </div>
                  )}
                </>
              ))
            )}
          </div>
          <div className="md:w-[48%] sm:w-full ">
            <h2 className="mb-5 font-semibold">Travel Guide</h2>
            <div className="flex justify-between px-5 py-5 bg-white rounded-lg">
              <div className="flex flex-col items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Hadwin Malone</h3>
                  <p>Guide since 2012</p>
                </div>
                <Button variant="button-secondary">Contact</Button>
              </div>
              <Image src={userImage} height={128} width={128} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
