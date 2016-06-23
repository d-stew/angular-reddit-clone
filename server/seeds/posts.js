
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),

    // Inserts seed entries
    knex('posts').insert({
        title: "ST. MARY'S GLACIER",
        author: "John Denver",
        image: "http://43mbhp3aft5g3uc0tuhsk4a8.wpengine.netdna-cdn.com/wp-content/uploads/2014/07/00-st-marys-glacier-near-idaho-springs-colorado-header.jpg",
        description: "Getting There: Take I-70 West from Denver, past the town and three exits of Idaho Springs. Take the next exit marked 'Fall River Road'. Just past the bottom of the ramp, take a right (north) on Fall River Road. Follow this road up past the town of Alice to one of two parking areas for the clearly marked trailhead to St. Mary's Glacier."
      }),
    knex('posts').insert({
        title: "HANGING LAKE",
        author: "Sarah Silverlake",
        image: "https://i.ytimg.com/vi/dXZ6ZFRo3o0/maxresdefault.jpg",
        description: "A beautiful lake located in Glenwood Canyon, about 7 miles (11 km) east of Glenwood Springs, Colorado. The lake is reached via a trailhead located along the Glenwood Canyon Bike and Pedestrian Path that runs along the north side of I-70 in the bottom of the canyon. The trail follows Dead Horse Creek, a tributary of the Colorado River and ascends some 1,000 feet (300 m) in elevation for 1.2 miles (1.9 km) from the trailhead to the lake."
      }),
    knex('posts').insert({
        title: "MAROON BELLS",
        author: "Daniel Stewart",
        image: "https://cdn-co.milespartnership.com/sites/default/master/files/MaroonBells.HeatherRousseau%5B1%5D_1.jpg",
        description: "The Maroon Bells are two peaks in the Elk Mountains, Maroon Peak and North Maroon Peak, separated by about a third of a mile. The mountains are on the border between Pitkin County and Gunnison County, Colorado, United States, about 12 miles southwest of Aspen. Both peaks are fourteeners. Maroon Peak, at 14,163 feet (4317.0 m), is the 27th highest peak in Colorado. North Maroon Peak, at 14,019 feet (4273.0 m), is the 50th highest."
      }),
    knex('posts').insert({
        title: "LAKE ISABEL",
        author: "Peyton Manning",
        image: "https://farm2.staticflickr.com/1099/1234427342_a67a578def_z.jpg",
        description: "Lake Isabel is located within the San Isabel National Forest in Pueblo County and Custer County, Colorado, United States. The lake is in the Wet Mountains. The lake is largely open to fishing year around and is regularly stocked by the Colorado Department of Wildlife. Available activities include fishing, hiking, camping and sledding in the winter."
      }),
    knex('posts').insert({
        title: "TRADING POST TRAIL at RED ROCKS",
        author: "Mike Tyson",
        image: "http://43mbhp3aft5g3uc0tuhsk4a8.wpengine.netdna-cdn.com/wp-content/uploads/2010/08/red-rocks-trading-post-trail-00-header1-831x560.jpg",
        description: "The Trading Post trail at Red Rocks takes you around 10 of the parks giant red rock formations. It’s a quick loop hike near Denver, accessible off of 470. It’s short, but long still long enough to get a workout."
      })
);
};
