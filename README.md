# QTKompressor

[Live Site]()

QTKompressor is an application created to demonstrate the workings of the [quadtree](https://en.wikipedia.org/wiki/Quadtree) data structure. By recursively decomposing an image into quadrants by similar colors,it can render a compressed version of the image. When breaking down based on looser thresholds, these flattened regions are illustrative of the underlying structure.

<!-- before/after image, high threshold -->

## Features and Implementation
 - Compression
 - Rendering
 - Gallery
 - Backend
 - Image Upload

### Compression

We load an image from Cloudinary into a floating image element. When complete, it paints itself onto a canvas element and triggers first a reading of each pixel's RGB values into an array and then a building of a new quadtree for the scanned pixels. Each `QTNode` is inserted with `x`, `y`, and `dim` variables that define the region of the image it contains.

 When built, each node scans through the pixels in its domain once to determine the average color vector and again to determine chromatic variance. Chromatic variance should be understood as standard stastical variance, i.e. the average squared distance of a pixel to the average, i.e E((R-R_avg)^2 + (G-G_avg)^2 + (B-B_avg)^2).
 <!-- Ask liz for help with math markdown -->

 <!-- Code snippet: Avg/Variance passes -->

If the calculated variance is below a certain threshold, the node and its contained region are assigned the average color vector to be painted in on rendering. If instead the variance is above a given threshold, the node divides its region in four and inserts a child for each quadrant. The process then repeats until all children contain a chromatically uniform region, even if that leaves them with a single pixel.

<!-- Code snippet: branching out or terminating in leaf -->

Once the tree has finished branching out, we've enough information to render the compressed image.

### Rendering

To render our quadtree, we traverse it, painting leaf regions with their average color and mapping recursive `draw(ctx)` calls to the children of any parent nodes. We opted to do this with timeouts to allow the app to progressively paint multiple regions of the map at once in a loosely coordinated manner.

Within each parent node, we set different timeouts for the recursive calls to children's `draw` methods to stagger their rendering.

<!-- snippet: recursive calls to draw -->

When rendering a leaf node, we animate painting the region by setting increasing timeouts with callbacks rendering incrementally larger squares

<!-- snippet: drawRadialOut -->

### Gallery

<!-- TODO: Loren's got best operational knowledge.   -->

### Backend

When designing this application, we determined a minimal backend would suffice for our needs.

Our server only needs to support four functions - serving the root page, servicing POST and GET requests to the image table, and serving static assets. For these lightweight needs, we built a lightweight Node.js/Express Server

We serve an API supporting POSTing and GETting images to and from a single table. Without multiple tables, we could use a non-relational database, and so we chose MongoDB for our database.

For the sake of simpliccity, we kept user interactions relatively anonymous - images are uploaded, indexed, and fetched by user tokens stored in the client's cookies. This allows returning users to see the images they've already uploaded without our needing to concern ourselves with signup processes for such a lightweight service.

### Image Upload

As we've both worked with Cloudinary before, we used its API to handle image delivery and uploads. Images are saved to the database with the `public_id` pulled from responses to successful Cloudinary uploads. Using the service to resize images was incredibly helpful, as the quadtree image breakdown is easiest to perform and demonstrate on square images, even moreso with width and height which are powers of 2.

We did have to contend with Cross-Origin Resource Sharing issues when reading pixel data from our canvas. As we painted the raw image to the canvas for sampling, it was "tainted" by cross-origin data. We eventually solved this by loading the image element with an "Anonymous" cross-origin attribute.  
