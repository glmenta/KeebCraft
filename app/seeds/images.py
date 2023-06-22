from app.models.images import db, UserImage, PartImage, BuildImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_user_images():
    user1 = UserImage(
        user_id=1,url='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    )
    user2 = UserImage(
        user_id=2,url='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    )
    user3 = UserImage(
        user_id=3,url='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'
    )

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.commit()

def undo_user_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_images"))
    db.session.commit()

def seed_parts_images():
    LekkerImg = PartImage(
        part_id=1,
        url='https://img.pagecloud.com/hSZq2rPKqjknWab4I2nb70fCl-U=/264x0/filters:no_upscale()/secretwootingstuffhome/lekkerxgateron-c5a67.png'
    )
    HolyPandaImg = PartImage(
        part_id=2,
        url='https://cdn.shopify.com/s/files/1/2711/4238/products/MMD-Holy-Panda-Tactile-Switch-3pin-RGB-SMD-62g-force-mx-Pro-Ver-switch-for-mechanical.jpg?v=1681354713'
    )
    BoxJadeImg = PartImage(
        part_id=3,
        url='https://cdn.shopify.com/s/files/1/0607/1563/0808/products/Kailh-box-jade-mechanical-keyboard-switch_grande.png?v=1658468791'
    )
    FreeBird60Img = PartImage(
        part_id=4,
        url='https://www.ashkeebs.com/wp-content/uploads/2021/08/FB60_Olive.jpg'
    )
    GMMKProImg = PartImage(
        part_id=5,
        url='https://files.pccasegear.com/images/1640050085-GLO-ACC-P75-TF-NB-thb.jpg'
    )
    KeychronC1Img = PartImage(
        part_id=6,
        url='https://m.media-amazon.com/images/I/61Q95aHUq3L._AC_UF894,1000_QL80_.jpg'
    )
    StockABSKeycapsImg = PartImage(
        part_id=7,
        url='https://i5.walmartimages.com/asr/7df0a0dc-8520-47bf-bff3-8f01919a63fa.70249b179203013d9ea74d7fbde8f81d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'
    )
    PBTResonanceImg = PartImage(
        part_id=8,
        url='https://us.maxgaming.com/bilder/artiklar/zoom/23171_1.jpg?m=1671545809'
    )
    GMKOliveImg = PartImage(
        part_id=9,
        url='https://cdn.shopify.com/s/files/1/2772/6534/products/GMK_Olive_Base_Kit_grande.png?v=1559352581'
    )
    StockStabsImg = PartImage(
        part_id=10,
        url='https://cdn.shopify.com/s/files/1/0238/7342/1376/products/cherrystabilizers2u.jpg?v=1673041817'
    )
    DurockStabsImg = PartImage(
        part_id=11,
        url='https://www.ashkeebs.com/wp-content/uploads/2020/08/stabs-min.jpg'
    )
    C3EqualzStabsImg = PartImage(
        part_id=12,
        url='https://m.media-amazon.com/images/I/41D25m-aIeS._AC_UF894,1000_QL80_.jpg'
    )
    AluminumImg = PartImage(
        part_id=13,
        url='https://m.media-amazon.com/images/I/61c3vfhETyL.jpg'
    )
    BrassImg = PartImage(
        part_id=14,
        url='https://m.media-amazon.com/images/I/61+GFWtXsjL._AC_UF894,1000_QL80_.jpg'
    )
    PolycarbonateImg = PartImage(
        part_id=15,
        url='https://cdn.shopify.com/s/files/1/0275/3649/0561/products/kbdfans-60-polycarbonate-plate-425682.jpg?v=1634777934'
    )

    db.session.add(LekkerImg)
    db.session.add(HolyPandaImg)
    db.session.add(BoxJadeImg)
    db.session.add(FreeBird60Img)
    db.session.add(GMMKProImg)
    db.session.add(KeychronC1Img)
    db.session.add(StockABSKeycapsImg)
    db.session.add(PBTResonanceImg)
    db.session.add(GMKOliveImg)
    db.session.add(StockStabsImg)
    db.session.add(DurockStabsImg)
    db.session.add(C3EqualzStabsImg)
    db.session.add(AluminumImg)
    db.session.add(BrassImg)
    db.session.add(PolycarbonateImg)
    db.session.commit()

def undo_parts_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.part_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM part_images"))
    db.session.commit()

def seed_build_images():
    linearImg = BuildImage(
        build_id=1,
        url='https://preview.redd.it/w53zdf7yq4t91.jpg?auto=webp&s=412c627744c559d6ede4848e8e51993ad74a83f8'
    )
    tactileImg = BuildImage(
        build_id=2,
        url='https://i.rtings.com/assets/products/NNCSyYNT/keychron-c1/design-medium.jpg'
    )
    clickyImg = BuildImage(
        build_id=3,
        url='https://i.imgur.com/SFeJ3xE.jpg'
    )
    db.session.add(linearImg)
    db.session.add(tactileImg)
    db.session.add(clickyImg)
    db.session.commit()

def undo_build_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.build_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM build_images"))
    db.session.commit()
