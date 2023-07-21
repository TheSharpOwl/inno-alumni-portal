import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewFeatureItem } from 'src/sections/overview/overview-feature-item';
import Link from 'next/link';

const now = new Date();

export const dashboardComponents = [
  {
    title: 'Network',
    description: 'Find the people you studied with',
    img: "/assets/overview/hand.png",
    link: "/#"
  },
  {
    title: 'Courses',
    description: 'Find and take additional studies specifically for graduates',
    img: "/assets/overview/hat.png",
    link: "/manage_electives"
  },
  {
    title: 'Pass',
    description: 'Get a pass to the university and come visit',
    img: "/assets/overview/lock.png",
    link: "/manage_pass"
  },
  {
    title: 'Donations',
    description: 'Support your alma mater',
    img: "/assets/overview/coins.png",
    link: "/make_donations"
  }
]
const Page = () => (
  <>
    <Head>
      <title>
        Overview | IU Alumni Portal
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        py: 8
      }}
    >
      <Container maxWidth="md">
        <Box
          component="main"
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
            py: 8
          }}
        >
          {dashboardComponents.map((feature, index) => (
            <Link href={feature.link}
              style={{ textDecoration: "none" }}
              key={index}>
              <OverviewFeatureItem
                feature={feature}
                sx={{ height: '100%' }}
              />
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);



export default Page;
