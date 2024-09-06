import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from "@/components/hook-form";
import { useEmailsContext } from '@/contexts';

export default function Home() {
  const { setEmails } = useEmailsContext();

  const CreateEmailSchema = Yup.object().shape({
    to: Yup.string().email().required('This field has to be provided'),
    cc: Yup.string().email().required('This field has to be provided'),
    bcc: Yup.string().email().required('This field has to be provided'),
    subject: Yup.string().required('This field has to be provided'),
    body: Yup.string().required('This field has to be provided'),
  });

  const defaultValues = {
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
  };

  const methods = useForm({
    resolver: yupResolver(CreateEmailSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch('http://localhost:3001/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log('Failed to search emails');
        return;
      }

      const newEmail = await response.json();

      setEmails(prevState => ([ ...prevState, newEmail ]));

      reset();
    } catch (err) {
      console.log('ERROR', err);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={5} sx={{ p: 3, maxWidth: '70%', ml: 4 }}>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Create a new email
          </Typography>
        </Grid>

        <Grid xs={12}>
          <RHFTextField
            name="to"
            label="To"
            required
          />
        </Grid>

        <Grid xs={12}>
          <RHFTextField
            name="cc"
            label="Cc"
            required
          />
        </Grid>

        <Grid xs={12}>
          <RHFTextField
            name="bcc"
            label="Bcc"
            required
          />
        </Grid>

        <Grid xs={12}>
          <RHFTextField
            name="subject"
            label="Subject"
            required
          />
        </Grid>

        <Grid xs={12}>
          <RHFTextField
            name="body"
            label="Body"
            required
            multiline
            rows={4}
          />
        </Grid>

        <Grid xs={12} sx={{ textAlign: "end" }}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Save
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
