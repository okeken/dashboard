
export default async function wait(seconds=3) {   
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("done");
     
      }, seconds * 1000);
    });
  }
  