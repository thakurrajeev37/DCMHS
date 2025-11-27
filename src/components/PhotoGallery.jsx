import React, { useState } from "react";
import { Box, Container, Typography, Dialog, IconButton } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import InfoIcon from "@mui/icons-material/Info";

function srcset(image, width, height, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
	};
}

const itemData = [
  {
    img: '/Staff.jpeg',
    title: 'Staff',
    author: '@bkristastucchio',
    featured: true,
  },
  {
    img: '/topper.jpg',
    title: 'Topper',
    author: '@rollelflex_graphy726',
  },
  {
    img: '/AnnualFunction.jpg',
    title: 'Annual Function',
    author: '@helloimnik',
  },
  {
    img: '/AnnualDay.jpg',
    title: 'Annual Function',
    author: '@nolanissac',
  },
  {
    img: '/RangoliCompetition.jpg',
    title: 'Rangoli Competition',
    author: '@hjrc33',
  },
  {
    img: '/IndependenceDay.jpg',
    title: 'Independence Day',
    author: '@arwinneil',
    featured: true,
  },
  {
    img: '/FarewellParty.jpg',
    title: 'Farewell Party',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];

const PhotoGallery = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleImageClick = (item, index) => {
		setSelectedImage(item);
		setCurrentIndex(index);
	};

	const handleClose = () => {
		setSelectedImage(null);
	};

	const handleNext = () => {
		const nextIndex = (currentIndex + 1) % itemData.length;
		setCurrentIndex(nextIndex);
		setSelectedImage(itemData[nextIndex]);
	};

	const handlePrevious = () => {
		const prevIndex = (currentIndex - 1 + itemData.length) % itemData.length;
		setCurrentIndex(prevIndex);
		setSelectedImage(itemData[prevIndex]);
	};

	return (
		<Box
			sx={{
				py: { xs: 4, md: 6 },
				bgcolor: "#F9F9F9"
			}}
		>
			<Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
				{/* Header */}
				<Box sx={{ textAlign: "center", mb: 5 }}>
					<Typography
						variant="h2"
						sx={{
							color: "#3B6866",
							fontWeight: 900,
							fontSize: { xs: "1.75rem", md: "2.5rem" },
							textTransform: "uppercase",
							mb: 0.5
						}}
					>
						Photo Gallery
					</Typography>
					<Typography
						variant="h6"
						sx={{
							color: "#424242",
							fontWeight: 400,
							fontSize: { xs: "0.9rem", md: "1.1rem" }
						}}
					>
						Glimpses of Life at DCM High School
					</Typography>
				</Box>

				{/* Image List Gallery */}
				<Box sx={{ display: "flex", justifyContent: "center", width: "100%", overflow: "hidden" }}>
					<ImageList
						variant="quilted"
						sx={{
							width: "100%",
							maxWidth: 1200,
							height: { xs: 500, sm: 700, md: 800 },
							transform: "translateZ(0)",
							overflow: "auto",
							margin: 0
						}}
						cols={2}
						rowHeight={120}
						gap={8}
					>
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem 
            key={item.img} 
            cols={cols} 
            rows={rows}
            sx={{
              cursor: "pointer",
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                zIndex: 2
              }
            }}
            onClick={() => handleImageClick(item, itemData.indexOf(item))}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                objectFit: "cover"
              }}
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.title}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: '#F7CA02' }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
				</Box>
			</Container>

			{/* Lightbox Dialog */}
			<Dialog
				open={Boolean(selectedImage)}
				onClose={handleClose}
				maxWidth="lg"
				fullWidth
				PaperProps={{
					sx: {
						bgcolor: "transparent",
						boxShadow: "none",
						overflow: "hidden"
					}
				}}
			>
				<Box
					sx={{
						position: "relative",
						bgcolor: "rgba(0,0,0,0.95)",
						p: 2
					}}
				>
					{/* Close Button */}
					<IconButton
						onClick={handleClose}
						sx={{
							position: "absolute",
							top: 10,
							right: 10,
							color: "white",
							bgcolor: "rgba(255,255,255,0.1)",
							"&:hover": {
								bgcolor: "rgba(255,255,255,0.2)"
							},
							zIndex: 2
						}}
					>
						<CloseIcon />
					</IconButton>

					{/* Previous Button */}
					<IconButton
						onClick={handlePrevious}
						sx={{
							position: "absolute",
							left: 10,
							top: "50%",
							transform: "translateY(-50%)",
							color: "white",
							bgcolor: "rgba(255,255,255,0.1)",
							"&:hover": {
								bgcolor: "rgba(255,255,255,0.2)"
							},
							zIndex: 2
						}}
					>
						<NavigateBeforeIcon sx={{ fontSize: 40 }} />
					</IconButton>

					{/* Next Button */}
					<IconButton
						onClick={handleNext}
						sx={{
							position: "absolute",
							right: 10,
							top: "50%",
							transform: "translateY(-50%)",
							color: "white",
							bgcolor: "rgba(255,255,255,0.1)",
							"&:hover": {
								bgcolor: "rgba(255,255,255,0.2)"
							},
							zIndex: 2
						}}
					>
						<NavigateNextIcon sx={{ fontSize: 40 }} />
					</IconButton>

					{/* Image */}
					{selectedImage && (
						<Box>
							<img
								src={selectedImage.img}
								alt={selectedImage.title}
								style={{
									width: "100%",
									height: "auto",
									maxHeight: "80vh",
									objectFit: "contain",
									display: "block"
								}}
							/>
							<Typography
								variant="h6"
								sx={{
									color: "white",
									textAlign: "center",
									mt: 2,
									fontWeight: 600
								}}
							>
								{selectedImage.title}
							</Typography>
						</Box>
					)}
				</Box>
			</Dialog>
		</Box>
	);
};

export default PhotoGallery;
