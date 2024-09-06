import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEmailsContext } from '@/contexts';
import NoData from '@/elements/no-data';


export default function CurrentEmail() {
  const [currentEmail, setCurrentEmail] = useState(null);
  const { emails } = useEmailsContext();

  const router = useRouter();

  useEffect(() => {
    if (!router.query.id || !emails?.length) {
      return;
    }

    const email = emails.find(email => email.id === Number(router.query.id));

    if (email) {
      setCurrentEmail(email)
    }
  }, [router?.query.id, emails]);


  if (!currentEmail) return (
    <NoData />
  );

  return (
    <Stack sx={{ p: 3, maxWidth: '70%', ml: 4 }} spacing={2}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Email data
      </Typography>

      <Grid container>
        <Grid xs={2}>
          <Typography variant="h6">
            To:
          </Typography>
        </Grid>

        <Grid xs={10}>
          <Typography variant="h6">
            {currentEmail.to}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={2}>
          <Typography variant="h6">
            Cc:
          </Typography>
        </Grid>

        <Grid xs={10}>
          <Typography variant="h6">
            {currentEmail.cc}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={2}>
          <Typography variant="h6">
            Bcc:
          </Typography>
        </Grid>

        <Grid xs={10}>
          <Typography variant="h6">
            {currentEmail.bcc}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={2}>
          <Typography variant="h6">
            Subject:
          </Typography>
        </Grid>

        <Grid xs={10}>
          <Typography variant="h6">
            {currentEmail.subject}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={2}>
          <Typography variant="h6">
            Body:
          </Typography>
        </Grid>

        <Grid xs={10}>
          <Typography variant="h6">
            {currentEmail.body}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid xs={12}>
          <Link href='/'>
            <Button variant="contained">
              Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Stack>
  );
}
