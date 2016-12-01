import React, { PropTypes } from 'react';
import {CloudinaryImage, cloudinaryConfig} from 'react-cloudinary';
import {Link, hashHistory} from 'react-router';

class Landing extends React.Component {


  render () {

    // <a href="http://blog.notdot.net/2009/11/Damn-Cool-Algorithms-Spatial-indexing-with-Quadtrees-and-Hilbert-Curves">Nick Johnsonz</a>

    cloudinaryConfig(window.c_o);
    return (
      <div className="container-fluid main-content">

        <div className="row header-row">
          <div className='col-lg-12 step text-center'>
            <h1 className='title-text'><Link to='/'>QT-Kompressor</Link></h1>
            <h4 className='sub-text'>Image Compression through quadtree decomposition</h4>
          </div>
        </div>

        <div className="container step landing">


        <div className="row step">
          <div className="col-lg-6">
            <h3 className="section-title text-center">Functionality</h3>
            <p>
              QT Kompressor introduces users to quadtrees by demonstrating their use
              in breaking down and reconstructing two dimensional data, in this case
              images conceptualized as RGB vectors arranged in a grid. When grouping
              and drawing regions of pixels based on color similarity, these flattened
              areas become illustrative of the underlying structure.
            </p>

          </div>
          <div className="col-lg-6 text-center">
            <button className='flatbutton' onClick={()=>hashHistory.push("/showcase")}>Open the Gallery</button>
            <CloudinaryImage id="loren-sub-divide" publicId="qi8iq3nfxcdggkkrgi6u" options={{width: 300, height: 300, crop: "scale"}}/>
          </div>
        </div>



        <div className="row step">
          <div className="col-lg-6">
            <h3 className="section-title text-center">Description</h3>
            <p>
              Quadtrees are trees whose nodes have either zero children
              or four. They are typically used to analyze two-dimensional
              data sets by recursively diving them into quadrants whenever
              a given node would contain more than one data point. The
              structure is often used to store sparse table data or to
              perform efficient collision detection.
            </p>
          </div>

          <div className="col-lg-6">
            <CloudinaryImage id="tree-breakdown" publicId="zssaahlczsmqc4yfazzk" options={{width: 300, height: 180 , crop: "scale"}}/>
          </div>
        </div>



        <div className="row step">
          <div className="col-lg-6">
            <h3 className="section-title text-center">Building</h3>
            <p>
              To build a quadtree, we first insert a root node covering the entirety
              of a given two dimensional array of values. If that region can be construed
              as having only one value, for instance the coordinates of the only object
              within the area, then that node is assigned that value and becomes a leaf
              node. Otherwise, we partition the region into four quadrants and insert
              into the present node a child node governing each quadrant, and the
              process continues until all branches end in leaves.
            </p>
          </div>
          <div className="col-lg-6">
            <CloudinaryImage id="gif-demo" publicId="qsizaefwwcnuuchslv1k" options={{width: 256, height: 256 , crop: "scale"}}/>
          </div>
        </div>
      </div>
    </div>

    );
  }
}

export default Landing;



// <div className="row step">
//   <div className="col-lg-12">
//     <h3 className="section-title text-center">Compression</h3>
//     <p>
//       When applying this structure to an image for compression, we need to decide
//       if a given region, and thus a given node, is single-valued. We accomplished
//       this by treating the RGB values of each pixel as a vector. We then, for any
//       given region, calculate the average vector and from it the variance as the
//       average square of the distance from a given pixel's color vector to the
//       regional average. If this variance falls below a certain threshold, we
//       accept the node as a leaf and paint its contained region with its average
//       color when rendering. Otherwise, we subdivide and continue.
//     </p>
//     <button onClick={()=>hashHistory.push("/showcase")}>See it in action!</button>
//   </div>
// </div>
