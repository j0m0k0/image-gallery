import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Api from "../../services/Api";
import { useEffect, useRef, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { saveAs } from "file-saver";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.general.isLoggedIn);
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageToShow, setImageToShow] = useState(undefined);
  const handleClose = () => {
    setShowModal(false);
  };
  const fileRef = useRef();
  useEffect(() => {
    if (isLoggedIn === true) {
      Api.galleryList()
        .then((res) => {
          setGallery(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  const handleNewImage = () => {
    fileRef.current.click();
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      Api.addImage(formData)
        .then((res) => {
          toast.success(res.data.message);
          Api.galleryList()
            .then((res2) => {
              setGallery(res2.data);
            })
            .catch((error2) => {
              console.log(error2);
            });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const showImage = async (src) => {
    await setImageToShow(src);
    setShowModal(true);
  };

  const deleteImage = (imageId) => {
    Api.removeImage(imageId)
      .then((res) => {
        Api.galleryList()
          .then((res) => {
            setGallery(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const downloadImage = (src) => {
    const name = src.split("/");
    // const format = name[name.length - 1].split(".");
    saveAs(src, name[name.length - 1]);
  };
  return (
    <>
      <Helmet>
        <title>خانه</title>
      </Helmet>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={showModal}
      >
        <DialogTitle id="simple-dialog-title">
          مشاهده تصویر آپلود شده
        </DialogTitle>
        <img src={imageToShow} alt={imageToShow} />
      </Dialog>
      <p>
        {isLoggedIn === true ? (
          <>
            <input
              type="file"
              className="hidden"
              ref={fileRef}
              onChange={handleImageUpload}
            />
            <h2>
              عکس های آپلود شده توسط شما{" "}
              <Button variant="outlined" onClick={handleNewImage}>
                آپلود تصویر جدید
              </Button>
            </h2>
            <Grid container>
              {gallery.map((image) => (
                <Grid
                  container
                  key={image.src}
                  item
                  md={4}
                  className="p-10 mb-20"
                >
                  <Grid item md={12}>
                    <div
                      style={{
                        display: "inline-block",
                        overflow: "hidden",
                        width: "100%",
                        height: "300px",
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.src}
                        onClick={() => showImage(image.src)}
                        className="image fit-cover h-300 pointer zoom"
                      />
                    </div>
                  </Grid>
                  <Grid item md={12} container justifyContent="space-between">
                    <Grid item md>
                      <Button
                        variant="outlined"
                        onClick={() => downloadImage(image.src)}
                      >
                        دانلود
                      </Button>
                    </Grid>
                    <Grid item md className="center">
                      <Button onClick={() => showImage(image.src)}>
                        مشاهده
                      </Button>
                    </Grid>
                    <Grid item md className="left">
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={() => deleteImage(image.id)}
                      >
                        حذف
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        ) : isLoggedIn === false ? (
          "شما هنوز وارد حساب خود نشده اید"
        ) : (
          ""
        )}
      </p>
    </>
  );
};

export default Home;
