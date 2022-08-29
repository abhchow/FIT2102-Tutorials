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

## Exercise 4: Beta reduction

Beta reduce the following expressions showing your working:

1. $(\lambda y.zy)a=za$
2. $(\lambda x.x)(\lambda x.x)=\lambda x.x$
3. $(\lambda x.xy)(\lambda x.xx)=(\lambda x.xx)y=yy$
4. $(\lambda z.z)(\lambda a.aa)(\lambda z.zb)=(\lambda a.aa)(\lambda z.zb)=(\lambda z.zb)(\lambda z.zb)=(\lambda z.zb)b=bb$

## Exercise 5: Eta conversion

Use Eta reduction/conversion to simplify the following expressions:

1. $\lambda x.zx=z$
2. $\lambda x.xz$
3. $(\lambda x.bx)(\lambda y.ay)=(b)(a)=ba$

## Exercise 6: Which of the following are combinators?

1. $\lambda x.xxx$ [Yes]
2. $\lambda xy.zx$ [No]
3. $\lambda xyz.xy(zx)$ [Yes]
4. $\lambda xyz.xy(zxy)$ [Yes]

_Hint: Remember that combinators are lambda expressions with no free variables_

## Exercise 7: Y-Combinator application

Apply the function \`g\` to the Y-combinator.

The definition of the Y-Combinator is: $Y=\lambda f.(\lambda x.f(xx))(\lambda x.f(xx))$ where Y is the Y combinator.

Use rules of reduction and equivalence to apply the function g to the Y combinator, and thus reduce the equation:

$$Yg=(\lambda f.(\lambda x.f(xx))(\lambda x.f(xx)))g$$
$$=(\lambda x.g(xx))(\lambda x.g(xx))$$
$$=g((\lambda x.g(xx))(\lambda x.g(xx)))$$
$$=g(Yg)$$
$$\vdots$$
$$=g(g(Yg))$$
$$\vdots$$
$$\text{[Divergent]}$$

## Exercise 8: Church Encoding

Use the lambda calculus definitions below to evaluate the expressions, show your working:

### 8.1

$$\text{NOT FALSE} = (\lambda x. \text{ IF }x\text{ FALSE TRUE})\text{ FALSE}$$
$$=\text{IF FALSE FALSE TRUE}$$
$$=(\lambda btf.btf)(\lambda xy.y)(\lambda xy.y)(\lambda xy.x)$$
$$=(\lambda xy.y)(\lambda xy.y)(\lambda xy.x)$$
$$=\lambda xy.x$$
$$=\text{TRUE}$$

### 8.2

$$\text{OR TRUE FALSE}=(\lambda xy.\text{IF }x\text{ TRUE }y)\text{ TRUE}\text{ FALSE}$$
$$=\text{IF TRUE TRUE FALSE}$$
$$=(\lambda btf.btf)(\lambda xy.x)(\lambda xy.x)(\lambda xy.y)$$
$$=(\lambda xy.x)(\lambda xy.x)(\lambda xy.y)$$
$$=\lambda xy.x$$
$$=\text{TRUE}$$

### 8.3

$$\text{AND TRUE TRUE}=(\lambda xy.\text{IF }x\ y\text{ FALSE})\text{ TRUE TRUE}$$
$$=\text{IF TRUE TRUE FALSE}$$
$$=\text{TRUE}$$

_Hint: What should the answers be for these expressions?_

TRUE = $\lambda xy.x$\
FALSE = $\lambda xy.y$\
IF = $\lambda btf.btf$\
AND = $\lambda xy.\text{IF }x\ y\text{ FALSE}$\
OR = $\lambda xy.\text{IF }x\text{ TRUE }y$\
NOT = $\lambda x.\text{IF }x\text{ FALSE TRUE}$
