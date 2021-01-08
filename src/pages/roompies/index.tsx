import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
// files
import RoompiesComp from '../../components/roompies/RoompiesComp';
import { db } from '../../configs/firebaseConfig';
import { Roompies } from '../../utils/interfaces';

export interface RoompiesPageProps {
  error: boolean;
  roompies: Roompies | [];
  err: any;
}

export default function RoompiesPage({
  error,
  roompies,
  err,
}: RoompiesPageProps) {
  const [busy, setBusy] = useState<boolean>(false);

  if (error) {
    toast.error(err.message);
    console.error(err);
  }

  if (busy) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader
          type="ThreeDots"
          color="Purple"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-200">
      <RoompiesComp roompies={roompies} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    // initial roompies
    const roompiesRef = db.collection('roompies').orderBy('createdAt', 'desc'); // roompies firestore Ref
    const snap = await roompiesRef.get();
    let arr = snap.docs.map((el) => ({
      ...el.data(),
      id: el.id,
    }));

    // render pertama kali tanpa ada query
    if (Object.keys(ctx.query).length === 0) {
      return {
        props: {
          error: false,
          roompies: arr,
          err: null,
        },
      };
    }

    // destructure query objects
    const { ageQue, budgetQue, genderQue, ownPetQue, smokerQue } = ctx.query;
    // let result = [];

    if (ageQue) {
      // ageQue => string '20', '30', '40', '50', '51'
      switch (ageQue) {
        case '51':
          (arr as Roompies) = (arr as Roompies).filter(
            (el) => el.age >= Number(ageQue),
          );
          break; // kalo gak di break eksekusi code berlanjut ke default statement

        default:
          (arr as Roompies) = (arr as Roompies).filter(
            (el) => el.age <= Number(ageQue),
          );
      }
    } else if (budgetQue) {
      // budgetQue => string '500000', '1000000', '2000000', '3000000', '3100000'
      switch (budgetQue) {
        case '3100000':
          (arr as Roompies) = (arr as Roompies).filter(
            (el) => el.budget >= Number(budgetQue),
          );
          break; // kalo gak di break eksekusi code berlanjut ke default statement

        default:
          (arr as Roompies) = (arr as Roompies).filter(
            (el) => el.budget <= Number(budgetQue),
          );
      }
    } else if (ownPetQue) {
      // ownPetQue => string 'true', ''
      (arr as Roompies) = (arr as Roompies).filter(
        (el) => el.ownPet === (ownPetQue === 'true'),
      );
    } else if (smokerQue) {
      // smokerQue => string 'true', ''
      (arr as Roompies) = (arr as Roompies).filter(
        (el) => el.smoker === (smokerQue === 'true'),
      );
    } else if (genderQue) {
      // genderQue => string 'Pria', 'Wanita'
      (arr as Roompies) = (arr as Roompies).filter(
        (el) => el.gender === genderQue,
      );
    }

    // filter duplicate value in array
    // const final = result.filter(
    //   (el, i, arr) => i === arr.findIndex((elem) => elem.id === el.id),
    // );

    return {
      props: {
        error: false,
        roompies: arr, // hasil filtered query roompies
        err: null,
      },
    };
  } catch (err) {
    // kalau error query ke firebase
    return {
      props: {
        error: true,
        roompies: [],
        err,
      },
    };
  }
};
