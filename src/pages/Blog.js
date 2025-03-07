import React, { useState } from 'react';
import styles from './Blog.module.css';

// Modal component
const Modal = ({ post, onClose }) => {
    // Split the content into lines for better formatting
    const formattedContent = post.content.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
    ));

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{post.title}</h2>
                <div className={styles.modalContent}>
                    {formattedContent}
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

function Blog() {
    const [selectedPost, setSelectedPost] = useState(null);

    // Blog posts data
    const blogPosts = [
        {
            title: "10 Skincare Tips for Glowing Skin",
            content: `1. Drink plenty of water.\n2. Use sunscreen daily.\n3. Exfoliate regularly.\n4. Moisturize your skin.\n5. Eat a healthy diet.\n6. Avoid smoking.\n7. Get enough sleep.\n8. Use products suitable for your skin type.\n9. Avoid touching your face.\n10. Stay consistent with your routine.`,
         
        },
        {
            title: "Best Skincare Products for Acne-Prone Skin",
            content: `1. Salicylic Acid Cleanser.\n2. Benzoyl Peroxide Spot Treatment.\n3. Niacinamide Serum.\n4. Oil-Free Moisturizer.\n5. Clay Masks.\n6. Retinol Cream.\n7. Sunscreen for Acne-Prone Skin.\n8. Gentle Exfoliator.`,
           
        },
      
        {
            title: " 10 Skincare Myths You Should Stop Believing Right Now",
            content: `1. Oily skin doesnt need moisturizer Hydration is essential for all skin types. \n 2.Natural ingredients are always better. Not all natural products are effective or safe. \n3. You dont need sunscreen on cloudy days. UV rays penetrate clouds and cause damage. \n4.Pores can open and close. Pores dont have muscles. steam only loosens debris. \n5.Toothpaste helps with pimples  \n6.You should wash your face multiple times a day.`
        },
        {
            title: "Morning vs. Night Skincare Routine: What’s the Difference?",
            content: `
        \n Morning Routine:
        \n Cleanser – Removes overnight oil buildup.
        \n Antioxidants (Vitamin C) – Protects against environmental damage.
        \n Moisturizer – Locks in hydration.
        \n Sunscreen (SPF 30+) – Shields skin from UV rays.
        \n Night Routine:
        \n Double Cleansing – Removes dirt, oil, and makeup effectively.
        \n Treatment (Retinol or Exfoliation) – Works overnight for skin renewal.
        \n Hydrating & Repairing Products – Use ceramides, peptides, or niacinamide.
            `
          },
          {
            title: "5 Common Skincare Mistakes That Are Ruining Your Skin",
            content: `
        \n Skipping Sunscreen – UV damage accelerates aging and pigmentation.
        \n Over-Exfoliating – Too much exfoliation weakens the skin barrier.
        \n Using Too Many Active Ingredients Together – Mixing retinol with AHA/BHA can cause irritation.
        \n Not Changing Pillowcases Often – Bacteria buildup can trigger acne.
        \n Ignoring Your Neck & Hands – These areas also show early signs of aging.
            `
          },

          {
            title: "The Best Skincare Ingredients for Every Skin Type",
            content: `
        \n Oily Skin: Niacinamide, Salicylic Acid, Clay.
        \n Dry Skin: Hyaluronic Acid, Ceramides, Squalane.
        \n Sensitive Skin: Centella Asiatica, Aloe Vera, Colloidal Oatmeal.
        \n Acne-Prone Skin: Tea Tree Oil, Benzoyl Peroxide, Zinc.
        \n Aging Skin: Retinol, Peptides, Vitamin C.
            `
          },
          {
            title: "How to Build an Effective Skincare Routine on a Budget",
            content: `
        \n Choose Drugstore Brands – Brands like CeraVe and The Ordinary offer great results at low prices.
        \n Simplify Your Routine – Stick to cleanser, moisturizer, and SPF.
        \n Use Multi-Functional Products – Niacinamide hydrates, brightens, and controls oil.
        \n Buy in Bulk – Saves money in the long run.
        \n DIY Face Masks – Natural ingredients like honey and yogurt work wonders.
            `
          },
          {
            title: "The Science Behind Skin Aging & How to Slow It Down",
            content: `
        \n Wear Sunscreen Daily – UV rays cause 80% of visible aging.
        \n Use Retinol & Peptides – Boost collagen production.
        \n Stay Hydrated – Prevents fine lines and dullness.
        \n Get Enough Sleep – Skin repairs itself at night.
        \n Eat Antioxidant-Rich Foods – Berries, nuts, and leafy greens help skin health.
            `
          },
          {
            title: "The Best Skincare Routine for Acne-Prone Skin",
            content: `
        \n Gentle Foaming Cleanser – Avoid harsh scrubs.
        \n Exfoliate (2-3x a week) – Salicylic acid unclogs pores.
        \n Spot Treatments – Use benzoyl peroxide or sulfur on pimples.
        \n Oil-Free Moisturizer – Hydrates without clogging pores.
        \n Non-Comedogenic Sunscreen – Protects against hyperpigmentation.
        \n Don’t Pick Pimples – Prevents scarring and bacterial spread.
            `
          },
          {
            title: "7 Skincare Hacks for a Glowing Complexion",
            content: `
        \n Use Ice Therapy – Reduces puffiness and tightens skin.
        \n Apply Vitamin C Serum – Brightens and evens skin tone.
        \n Double Cleanse – Removes impurities thoroughly.
        \n Steam Before Exfoliation – Opens pores for better absorption.
        \n Sleep on a Silk Pillowcase – Prevents wrinkles and irritation.
        \n Drink Green Tea – Packed with antioxidants for clear skin.
        \n Massage Your Face – Boosts circulation and promotes glow.
            `
          },
          {
            title: "How to Transition Your Skincare Routine for Different Seasons",
            content: `
        \n Winter:
        \n Switch to a hydrating cleanser.
        \n Use a thicker moisturizer with ceramides.
        \n Apply facial oils for extra nourishment.
        \n Summer:
        \n Use a lightweight, gel-based moisturizer.
        \n Apply more sunscreen (reapply every 2 hours).
        \n Add antioxidants to prevent sun damage.
        \n Spring/Fall:
        \n Exfoliate gently to remove seasonal buildup.
        \n Balance hydration with serums and mists.
        \n Adjust retinol and actives based on weather sensitivity.
            `
          }
    ];

    return (
        <div className={styles.blogbg}>
            <h1>Skincare Blog</h1>
            <div className={styles.blogPostsContainer}>
                {blogPosts.map((post, index) => (
                    <div key={index} className={styles.blogPost} onClick={() => setSelectedPost(post)}>
                        <div className={styles.blogPostContent}>
                            <h2>{post.title}</h2>
                            <p className={styles.blogPostDate}>{post.date}</p>
                            <p>{post.content.split('\n')[0]}...</p> {/* Show the first tip as a preview */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Render the modal if a post is selected */}
            {selectedPost && (
                <Modal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
}

export default Blog;