import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { useEmailsContext } from '@/contexts';

export default function EmailsList() {
  const { emails } = useEmailsContext();

  return (
    <Stack  spacing={2}>
      {emails.map(email =>
        <Link key={email.id} href={`/${email.id}`} className='sidebar-nav-item'>
          {email.to}
        </Link>
      )}
    </Stack>
  );
}
