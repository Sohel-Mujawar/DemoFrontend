import React from 'react';

import '../app.css';
import {TreeNode} from '@/components/Network';
import {useGetNetwotkTree} from '@/lib/react-query/network';
import {useAuthContext} from '@/context/AuthContext';
import Loader from '@/components/common/Loader';

const Network = () => {
  const {user} = useAuthContext();
  const crn = user?.user?.crnNo;
  const {data, isSuccess, isPending, isError} = useGetNetwotkTree(crn || '');
  // const staticNetworkData = {
  //   name: 'Root',
  //   data: {
  //     username: 'root',
  //     id: '1',
  //     first_name: 'Root Name',
  //     sponserer_username: 'sponsor',
  //   },
  //   children: [
  //     {
  //       name: 'Child 1',
  //       data: {
  //         username: 'child1',
  //         id: '2',
  //         first_name: 'Child One',
  //         sponserer_username: 'sponsor1',
  //       },
  //       children: [
  //         {
  //           name: 'Grandchild 1',
  //           data: {
  //             username: 'grandchild1',
  //             id: '3',
  //             first_name: 'Grandchild One',
  //             sponserer_username: 'sponsor2',
  //           },
  //           children: [],
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Child 3',
  //       data: {
  //         username: 'child2',
  //         id: '4',
  //         first_name: 'Child Two',
  //         sponserer_username: 'sponsor3',
  //       },
  //       children: [],
  //     },
  //   ],
  // };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : isSuccess ? (
        <div className="dottedBackground mx-8">
          <TreeNode network={data} />
        </div>
      ) : (
        <div className="dottedBackground mx-8">Error loading network.</div>
      )}
    </>
  );
};

export default Network;
