import React, { PropTypes } from 'react';
import {CloudinaryImage, cloudinaryConfig} from 'react-cloudinary';
import {Link, hashHistory} from 'react-router';

class Landing extends React.Component {
  render () {
    cloudinaryConfig(window.c_o);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <h1>QTKompressor</h1>
            <h3>Image Compression through quadtree decomposition</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <p>
              QT Kompressor introduces users to quadtrees by demonstrating their use
              in breaking down and reconstructing two dimensional data, in this case
              images conceptualized as RGB vectors arranged in a grid.
            </p>
            <button onClick={()=>hashHistory.push("/showcase")}>Open the Gallery</button>
          </div>
          <div className="col-sm-6">
            <CloudinaryImage publicId="qi8iq3nfxcdggkkrgi6u" options={{width: 300, height: 300, crop: "scale"}}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <CloudinaryImage publicId="zssaahlczsmqc4yfazzk" options={{width: 300, height: 180 , crop: "scale"}}/>
            <div>H/T <a href="http://blog.notdot.net/2009/11/Damn-Cool-Algorithms-Spatial-indexing-with-Quadtrees-and-Hilbert-Curves">Nick Johnsonz</a></div>
          </div>
          <div className="col-sm-6">
            <p>
              Quadtrees, as the name suggests, are trees whose nodes have either zero
              children or four.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
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
          <div className="col-sm-6">
            <CloudinaryImage publicId="qsizaefwwcnuuchslv1k" options={{width: 256, height: 256 , crop: "scale"}}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <p>
              When applying this structure to an image for compression, we need to decide
              if a given region, and thus a given node, is single-valued. We accomplished
              this by treating the RGB values of each pixel as a vector. We then, for any
              given region, calculate the average vector and from it the variance as the
              average square of the distance from a given pixel's color vector to the
              regional average. If this variance falls below a certain threshold, we
              accept the node as a leaf and paint its contained region with its average
              color when rendering. Otherwise, we subdivide and continue.
            </p>
            <button onClick={()=>hashHistory.push("/showcase")}>See it in action!</button>
          </div>
        </div>
      </div>

    );
  }
}

export default Landing;
