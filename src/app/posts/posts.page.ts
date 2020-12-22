import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WordpressService } from '../Service/wordpress.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts = [];
  page = 1;
  count = null;

  constructor(
    private loadingCtrl: LoadingController,
    private wp: WordpressService
  ) { }

  async ngOnInit() {
    let loading = await this.loadingCtrl.create({
      message: 'Loading Data...'
    });
    await loading.present();

    this.wp.getPosts().subscribe(res => {
      console.log('infor', res);
      this.count = this.wp.totalPosts;
      this.posts = res;
      loading.dismiss();
    });
  }

  async loadMore(event) {
    this.page++;

    this.wp.getPosts(this.page).subscribe(res => {
      this.posts = [...this.posts, ...res];

      event.target.complete();

      if (this.page == this.wp.pages) {
        event.target.disabled = true;
      }
    });
  }

}
