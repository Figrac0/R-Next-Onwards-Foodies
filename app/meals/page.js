import Link from "next/link";
import { Suspense } from "react";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

async function Meals() {
    const meals = await getMeals();

    return <MealsGrid meals={meals} />;
}

function MealPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{" "}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy
                    and fun!
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share Yor Favorite Recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense
                    fallback={
                        <div className={classes.wrapper}>
                            <div className={classes.ring}></div>
                            <p className={classes.text}>Fetching meals</p>
                        </div>
                    }>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}

export default MealPage;
