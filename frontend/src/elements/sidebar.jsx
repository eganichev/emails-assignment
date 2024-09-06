import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import {AccountBox} from '@mui/icons-material';
import EmailsList from '@/components/emails-list';
import SearchBar from '@/components/search-bar';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link href="/">
        <EmailIcon />
      </Link>
      <Link href="/leads">
        <AccountBox />
      </Link>

      <SearchBar />
      <EmailsList />
    </div>
  );
}
