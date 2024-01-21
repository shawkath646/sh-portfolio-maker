import 'server-only';
import Link from 'next/link';
import { Table, TableContainer, Tbody, Th, Thead, Td, Tr } from "@chakra-ui/react";
import { db } from '@/lib/firebase';

export default async function UsersTable() {

  const metadataSnapshot = await db.collection('metadata').get();

  const metadataArray = [];
  metadataSnapshot.forEach(doc => {
    metadataArray.push(doc.data());
  });


    return (
        <TableContainer my={20} className='bg-gradient-to-tr from-blue-300 via-white to-white'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Full name</Th>
                <Th>Created Time</Th>
                <Th>Views</Th>
              </Tr>
            </Thead>
            <Tbody>
              {metadataArray.map((data, index) => (
                <Tr key={index}>
                  <Td>
                    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/p/${data.username}`} className='text-blue-500 hover:text-blue-700 transition-all'>{data.fullName}</Link>
                  </Td>
                  <Td>
                    {data.joinedOn?.toDate().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Td>
                  <Td>{data.views}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
    );
}