"use client"
import { useEffect } from "react"
import Footer from "../components/common/Footer"
import HeroSection from "../components/hero/HeroSection"
import FashionSection from "../components/common/FashionSection"
import Product from "../components/product/Product"
import productData from '../data/productData'
import FeaturesSection from "../components/common/FeaturesSection"

export default function Page() {

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])


  const bestSellers = productData.filter(product => product.rank > 4);
  const otherProducts = productData.filter(product => product.rank <= 4);

  return (
    <div className="w-full h-dvh relative">
        <HeroSection />
        <Product title="Best Sellers" products={bestSellers} />
        <FashionSection />
        <Product title="Our Other Designs" products={otherProducts} />
        <FeaturesSection/>
        <Footer />
    </div>
  )
}
