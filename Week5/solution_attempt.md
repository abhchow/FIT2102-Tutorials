# Week 5 Tutorial solution attempt

## Exercise 1: I-Combinator

What is the I-Combinator and why might you use it? Please translate its JavaScript code to a lambda calculus expression:

```js
//I-Combinator in Javascript
(x) => x;
```

The I-Combinator is known as the Identity combinator, it can be used to extract data as it is without modification.

## Exercise 2: Alpha equivalence

1. Which lambda expression is alpha equivalent to $\lambda x.x$:
    1. a. $\lambda x.y$
    2. $\lambda a.a$
    3. $\lambda z.x$
2. Which lambda expression is alpha equivalent to $\lambda xy.yx$:
    1. $\lambda az.az$
    2. $\lambda a.(\lambda b.ba)$
    3. $\lambda az.ba$
3. Which lambda expression is alpha equivalent to $\lambda xy.xz$:
    1. $\lambda xz.xz$
    2. $\lambda mn.mz$
    3. $\lambda z.(\lambda x.xz)$

Solutions

1. 2 or b $\left[\lambda x.x=\lambda a.a\right]$
2. 2 or b $\left[\lambda xy.yx=\lambda ay.ya=\lambda ab.ba=\lambda a\lambda b.ba=\lambda a.(\lambda b.ba)\right]$
3. 2 or b $\left[\lambda xy.xz=\lambda my.mz=\lambda mn.mz\right]$

## Exercise 3: Beta normal form or divergence

With the following lambda expressions, can you simplify them using beta reduction or do they diverge? Please show the normal form, or divergence by applying the lambda functions. Write out your steps.

Reminder: normal form is when an expression has been evaluated and is an answer. (You cannot further reduce the expression)

1. $(\lambda x.x)y=y$ [Normal form]
2. $\lambda x.xx$ [Normal form]
3. $(\lambda z.zz)(\lambda y.yy)=(\lambda y.yy)(\lambda y.yy)=\cdots$ [Divergent]
4. $(\lambda x.xx)y=yy$ [Normal form]
