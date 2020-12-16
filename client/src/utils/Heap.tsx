import React, { Fragment, useEffect, useState } from "react"


const Heap = () => {

    const [output, setOutput] = useState<any[]>([])

    useEffect(() => {

        const getPermutations = ( array: any[] ) => {

            const output: any[] = []
            const swapIndex = ( arrayToSwapElements: any[], first: number, second: number ) => {
                const indexOfA = arrayToSwapElements[first]
                arrayToSwapElements[first] = arrayToSwapElements[second]
                arrayToSwapElements[second] = indexOfA
            }

            const generate = ( n: number, featureArray: any[] ) => {

                if ( n === 1 ) {
                    return output.push(featureArray.slice())
                }

                    generate( n - 1, featureArray )

                    for (let i = 0; i < n - 1; i++) {
                        if ( n % 2 === 0 ) {
                            swapIndex( featureArray, i, n - 1 )
                        } else {
                            swapIndex( featureArray, 0, n - 1 )
                        }

                        generate( n - 1, featureArray)
                    }


            }
            generate(array.length, array.slice())

            return output
        }

        return setOutput(getPermutations([3, 2, 6]))
        



    }, [])

    // console.log(output)
    return (
        <Fragment>

        </Fragment>
    )
}
export default Heap;