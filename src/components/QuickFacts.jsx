import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';

const QuickFacts = () => {
  const sections = [
    {
      title: 'Transportation',
      icon: DirectionsBusIcon,
      color: '#3B6866',
      position: 'top-left',
      stats: [
        'Daily bus service covering',
        '15+ routes',
        'Safe and secure transportation',
        'for all students'
      ]
    },
    {
      title: 'Education Benefits',
      icon: SchoolIcon,
      color: '#F7CA02',
      position: 'left',
      stats: [
        'PSEB affiliated curriculum',
        'Focus on holistic development',
        'Character building programs',
        'Modern teaching methods'
      ]
    },
    {
      title: 'Academic Excellence',
      icon: MenuBookIcon,
      color: '#3B6866',
      position: 'bottom-left',
      stats: [
        '100% Board Results',
        'Experienced faculty',
        'Individual attention',
        'Regular assessments'
      ]
    },
    {
      title: 'Infrastructure',
      icon: AccountBalanceIcon,
      color: '#F7CA02',
      position: 'top-right',
      stats: [
        'Smart classrooms',
        'Computer labs',
        'Well-stocked library',
        'Sports facilities'
      ]
    },
    {
      title: 'Student Strength',
      icon: TrendingUpIcon,
      color: '#3B6866',
      position: 'right',
      stats: [
        'Nursery to 10th grade',
        '25:1 student-teacher ratio',
        'Co-educational environment',
        'Inclusive learning'
      ]
    },
    {
      title: 'Programs & Activities',
      icon: PeopleIcon,
      color: '#F7CA02',
      position: 'bottom-right',
      stats: [
        'Sports and games',
        'Cultural activities',
        'Science exhibitions',
        'Annual day celebrations'
      ]
    }
  ];

  return (
    <Box 
      sx={{ 
        py: { xs: 4, md: 6 }, 
        bgcolor: '#FAFAFA',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h2"
            sx={{
              color: '#3B6866',
              fontWeight: 900,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              textTransform: 'uppercase',
              mb: 0.5
            }}
          >
            Quick Facts
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#424242',
              fontWeight: 600,
              fontSize: { xs: '1rem', md: '1.5rem' }
            }}
          >
            DCM High School
          </Typography>
        </Box>

        {/* Circular Layout with Center */}
        <Box 
          sx={{ 
            position: 'relative',
            minHeight: { xs: 'auto', md: '700px' },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 3, md: 0 }
          }}
        >
          {/* Curved connecting lines (desktop only) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { md: 'min(550px, 90vw)' },
              height: { md: 'min(550px, 90vw)' },
              border: '2px dashed #3B6866',
              borderRadius: '50%',
              zIndex: 0,
              opacity: 0.3
            }}
          />

          {/* Center Circle */}
          <Paper
            elevation={6}
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              top: { md: '50%' },
              left: { md: '50%' },
              transform: { md: 'translate(-50%, -50%)' },
              width: { xs: 200, sm: 220, md: 220 },
              height: { xs: 200, sm: 220, md: 220 },
              borderRadius: '50%',
              bgcolor: '#3B6866',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 2, md: 3 },
              mx: 'auto',
              zIndex: 2,
              boxShadow: '0 6px 24px rgba(59, 104, 102, 0.3)',
              border: '4px solid white'
            }}
          >
            <SchoolIcon sx={{ fontSize: { xs: 50, md: 60 }, color: 'white', mb: { xs: 1, md: 1.5 } }} />
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 800,
                textAlign: 'center',
                fontSize: { xs: '0.9rem', md: '1.1rem' }
              }}
            >
              Excellence in
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#F7CA02',
                fontWeight: 900,
                textAlign: 'center',
                fontSize: { xs: '1.1rem', md: '1.4rem' }
              }}
            >
              Education
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                mt: 0.5,
                fontSize: { xs: '0.75rem', md: '0.8rem' }
              }}
            >
              Since 1998
            </Typography>
          </Paper>

          {/* Positioned Cards */}
          {sections.map((section, index) => {
            const positions = {
              'top-left': { 
                xs: { position: 'relative' },
                md: { position: 'absolute', top: '5%', left: '8%' }
              },
              'left': { 
                xs: { position: 'relative' },
                md: { position: 'absolute', top: '40%', left: '2%' }
              },
              'bottom-left': { 
                xs: { position: 'relative' },
                md: { position: 'absolute', bottom: '5%', left: '8%' }
              },
              'top-right': { 
                xs: { position: 'relative' },
                md: { position: 'absolute', top: '5%', right: '8%' }
              },
              'right': { 
                xs: { position: 'relative' },
                md: { position: 'absolute', top: '40%', right: '2%' }
              },
              'bottom-right': { 
                xs: { position: 'relative' },
                md: { position: 'absolute', bottom: '5%', right: '8%' }
              }
            };

            const IconComponent = section.icon;
            
            return (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  ...positions[section.position],
                  width: { xs: '90%', sm: 280, md: 240 },
                  p: { xs: 2, sm: 2.5 },
                  bgcolor: 'white',
                  borderRadius: 3,
                  border: `2px solid ${section.color}`,
                  zIndex: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: { sm: 'translateY(-5px)', md: 'scale(1.05)' },
                    boxShadow: `0 10px 24px ${section.color}40`,
                    zIndex: 3
                  }
                }}
              >
                {/* Icon Section */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: { xs: 1, sm: 1.5 }
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 70, sm: 90 },
                      height: { xs: 70, sm: 90 },
                      borderRadius: '50%',
                      bgcolor: `${section.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${section.color}`
                    }}
                  >
                    <IconComponent sx={{ fontSize: { xs: 45, sm: 60 }, color: section.color }} />
                  </Box>
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    color: section.color,
                    fontWeight: 800,
                    textAlign: 'center',
                    mb: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {section.title}
                </Typography>

                {/* Stats */}
                <Box 
                  sx={{ 
                    pl: { xs: 0, sm: 0.5 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', sm: 'flex-start' }
                  }}
                >
                  {section.stats.map((stat, idx) => (
                    <Box 
                      key={idx} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        mb: 0.75,
                        textAlign: { xs: 'center', sm: 'left' }
                      }}
                    >
                      <Typography
                        sx={{
                          color: section.color,
                          fontWeight: 900,
                          mr: 0.75,
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      >
                        •
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#424242',
                          fontSize: { xs: '0.8rem', sm: '0.85rem' },
                          lineHeight: 1.5
                        }}
                      >
                        {stat}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default QuickFacts;
