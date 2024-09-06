import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function NoData() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Typography variant="h5">
        No data
      </Typography>
    </Stack>
  );
}
